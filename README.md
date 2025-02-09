# IPyParallel-Auto

VSCode extension to automatically rewrite notebook cells to start with `%%px
--local` (or similar) for
[ipyparallel](https://ipyparallel.readthedocs.io/en/latest/).

<img src="https://github.com/rdyro/ipyparallel-auto/blob/main/images/demo.png?raw=true" width="100%" />

*Note: This extension is not affiliated with the excellent IPython or
[ipyparallel](https://ipyparallel.readthedocs.io/en/latest/) projects.*

---

Commands provided:

#### `IPyParallelAuto: Enable Rewriting Cells`
  - This command will rewrite all code cells in the notebook to start with `%%px --local`
  - Will NOT modify cells that:
    - Start with `%%px` or `%px` (e.g., a version not include the `--local`)
    - Start with a comment `#...`
    - Containing `ipyparallel` keyword (these are cluster control cells)
    - Non-code cells

#### `IPyParallelAuto: Disable Rewriting Cells`
  - Disables the rewriting of cells

#### `IPyParallelAuto: Clean (undo) Notebook`
  - Removes all `%%px` or `%px` from the cell headers

#### `IPyParallelAuto: Restart Cluster`
Nominally tries to restart the cluster
  - Restarts the jupyter kernel of the notebook
  - Runs a specified arbitrary command
  - Set VSCode User Settings: `"ipyparallel-auto.clusterRestartCommand": "your_command"`;
  - For example
      ```
      "ipyparallel-auto.clusterRestartCommand": "pkill ipengine; pkill ipcontroller; screen -S controller -d -m ipcontroller; screen -S engine -d -m ipengine"
      ```
      OR
      ```
      "ipyparallel-auto.clusterRestartCommand": "bash /home/username/cluster_restart.sh"
      ```

## Settings

Available settings:
```
{
  ...
  "ipyparallel-auto.cellHeader": "Cell header (e.g., `%%px`, `%%px --local`, `%%px --target 1`, etc.)",
  "ipyparallel-auto.clusterRestartCommand": "Restart cluster command to run (e.g. `bash ./restart.sh`)"
  ...
}
```
You can find them in VSCode settings by filtering for
`@ext:rdyro.ipyparallel-auto` or by adding the setting fields directly in the
settings.json file.