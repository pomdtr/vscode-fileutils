import { workspace, Uri } from "vscode";

export async function exists(path: Uri) {
    try {
    await workspace.fs.stat(path)
    return true;
    } catch (e) {
    return false;
    }
}
