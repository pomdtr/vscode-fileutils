import { workspace } from "vscode";
import * as fs from "../../src/lib/fs";
import { editorFile1, editorFile2, fixtureFile1, fixtureFile2, tmpDir } from "./environment";

export async function beforeEach(): Promise<void> {
    if (await fs.exists(tmpDir)) {
        await workspace.fs.delete(tmpDir, { recursive: true, useTrash: false });
    }
    await workspace.fs.copy(fixtureFile1, editorFile1, { overwrite: true });
    await workspace.fs.copy(fixtureFile2, editorFile2, { overwrite: true });
}

export async function afterEach(): Promise<void> {
    if (await fs.exists(tmpDir)) {
        await workspace.fs.delete(tmpDir, { recursive: true, useTrash: false });
    }
}
