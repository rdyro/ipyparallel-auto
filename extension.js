const vscode = require('vscode');
const { exec } = require('child_process');

function activate(context) {
	var _ENABLE_REWRITING = false;
	var _CELL_CHANGES_MAP = {};

	function _header_matches(text) {
		return text.match(/^%%px(.*?)$/s) !== null || text.match(/^%px(.*?)$/s) !== null;
	}

	context.subscriptions.push(vscode.commands.registerCommand('ipyparallel-auto.enableRewriting', () => {
		_ENABLE_REWRITING = true;
		_CELL_CHANGES_MAP = {};
	}));

	context.subscriptions.push(vscode.commands.registerCommand('ipyparallel-auto.disableRewriting', () => {
		_ENABLE_REWRITING = false;
	}));

	context.subscriptions.push(vscode.commands.registerCommand('ipyparallel-auto.removeHeadings', () => {
		_ENABLE_REWRITING = false;
		if (vscode.window.activeNotebookEditor === undefined) return;
		const document = vscode.window.activeNotebookEditor.notebook;
		if (document === undefined) return;
		const cell_count = vscode.window.activeNotebookEditor.notebook.getCells().length;
		for (var cell_idx = 0; cell_idx < cell_count; cell_idx++) {
			const cell = document.cellAt(cell_idx);
			var text = cell.document.getText();
			if (cell.kind == vscode.NotebookCellKind.Code && _header_matches(text)) {
				const edit = new vscode.WorkspaceEdit();
				edit.replace(cell.document.uri, new vscode.Range(0, 0, 1, 0), ""); // remove the first line
				const success = vscode.workspace.applyEdit(edit);
			}
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('ipyparallel-auto.restartCluster', async () => {
		// check if the current context is a notebook
		if (vscode.window.activeNotebookEditor === undefined) return;

		// restart the current jupyter notebook kernel
		const restart_commands = (await vscode.commands.getCommands(true))
			.filter((item) => item.match(/jupyter.restartkernel/i)).sort();
		if (restart_commands.length > 0) {
			vscode.window.showInformationMessage("Restarting kernel...");
			await vscode.commands.executeCommand(restart_commands[0]);
		} else {
			vscode.window.showInformationMessage("No restart kernel command found.");
		}

		// run the restart bash command
		const config = vscode.workspace.getConfiguration("ipyparallel-auto");
		const cmd = config.clusterRestartCommand;
		if (cmd === undefined || cmd === "") return;
		vscode.window.showInformationMessage("Restarting cluster: `" + cmd + "`");
		exec(cmd, (error, stdout, stderr) => {
			if (error) vscode.window.showInformationMessage("Error running restart command.")
		});
	}));

	setInterval(() => {
		if (!_ENABLE_REWRITING) return;
		if (vscode.window.activeNotebookEditor === undefined) return;
		const document = vscode.window.activeNotebookEditor.notebook;
		if (document === undefined) return;
		const cell_count = vscode.window.activeNotebookEditor.notebook.getCells().length;
		for (var cell_idx = 0; cell_idx < cell_count; cell_idx++) {
			const cell = document.cellAt(cell_idx);
			if (cell.kind != vscode.NotebookCellKind.Code) continue;

			const text = cell.document.getText();

			// disable this for now
			//if (text == _CELL_CHANGES_MAP[cell_idx]) continue;

			if (!_header_matches(text) && !text.match(/^#(.*?)$/s)
				&& text.indexOf("ipyparallel") === -1) {

				const edit = new vscode.WorkspaceEdit();
				edit.insert(cell.document.uri, cell.document.positionAt(0), "%%px --local\n");
				const success = vscode.workspace.applyEdit(edit);
				// disable this for now
				// _CELL_CHANGES_MAP[cell_idx] = cell.document.getText();
			}
		}
	}, 100);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
