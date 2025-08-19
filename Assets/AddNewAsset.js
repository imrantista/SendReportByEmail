class AddNewAsset {
  async addAsset(page) {
    const randomString = Math.random().toString(36).substring(2, 7);
    const assetName = `Asset-${randomString}-90`;
    await page.waitForTimeout(2000);
    await page.getByRole('textbox', { name: 'Name *' }).fill(assetName);
    await page.locator('.css-tlfecz-indicatorContainer > .css-8mmkcg').click();
    await page.getByText('Assets', { exact: true }).click();
    await page.locator('.ql-editor.ql-blank').first().fill('Assets descritions');
    await page.locator('.quill.assetScriptEditor > .ql-container > .ql-editor').fill('Assets scripts');
    await page.locator('.vs-modal-body').getByText('Tag(s)', { exact: true }).scrollIntoViewIfNeeded();
    await page.locator('input[name="minutes"]').fill('10');
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await page.waitForTimeout(100);

  }
}
export default AddNewAsset;