import { DuplicateFileCommand } from '../../src/command/DuplicateFileCommand';
import { DuplicateFileController } from '../../src/controller';
import * as helper from '../helper';

describe('DuplicateFileCommand', () => {

    const subject = helper.createTestSubject(DuplicateFileCommand, DuplicateFileController);

    beforeEach(helper.beforeEach);

    afterEach(helper.afterEach);

    describe('as command', () => {
        describe('with open text document', () => {
            beforeEach(async () => {
                await helper.openDocument(helper.editorFile1);
                helper.stubInputBox(Promise.resolve(helper.targetFile.path));
            });

            afterEach(async () => {
                await helper.closeAllEditors();
                helper.restoreInputBox();
            });

            helper.protocol.it('prompts for file destination', subject, 'Duplicate As');
            helper.protocol.it('duplicates current file to destination', subject);
            helper.protocol.describe('target file in non existing nested directories', subject);
            helper.protocol.describe('when target destination exists', subject);
            helper.protocol.it('opens target file as active editor', subject);
        });

        helper.protocol.describe('without open text document', subject);
    });

    describe('as context menu', () => {
        beforeEach(async () => helper.stubInputBox(Promise.resolve(helper.targetFile.path)));

        afterEach(async () => helper.restoreInputBox());

        helper.protocol.it('prompts for file destination', subject, 'Duplicate As');
        helper.protocol.it('duplicates current file to destination', subject, helper.editorFile1);
        helper.protocol.it('opens target file as active editor', subject, helper.editorFile1);
    });
});
