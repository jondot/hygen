# Here be dragons.
Some tests use `ftest`. Since that swaps the file system out with a mock file system, note that:

* Jest can't do snapshot testing (because it needs a real fs), and it will always write new snapshots and never actually compare snapshots.
* Console.log can't happen. Because it needs to dynamically load a module (callsites) which won't exist, because there's no file system that holds `node_modules` any more.

The solution is to be mindful of all implicit file access during `ftest`, and keep everything in-memory and side-effect free, including, but not limited to, Jest matchers.
