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