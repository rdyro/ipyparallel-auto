# IPyParallelAuto

VsCode extension to automatically rewrite notebook cells to start with `%%px --local`.

Three commands are provided:

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
  - Nominally tries to restart the cluster
  - Runs a specified arbitrary command
  - Set VSCode User Settings: `"ipyparallel-auto.clusterRestartCommand": "your_command"`;
  - For example
      ```
      "ipyparallel-auto.clusterRestartCommand": "pkill ipengine; pkill ipcontroller; screen -S controller -d -m ipcontroller; screen -S engine -d -m ipengine"
      ```
