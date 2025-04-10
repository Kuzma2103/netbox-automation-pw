import { Locator, Page } from '@playwright/test';
import { BaseActions } from '../utils/BaseActions';

export class BasePage {
	readonly baseActions: BaseActions;

	constructor(readonly page: Page) {
		this.baseActions = new BaseActions(page);
	}

	/**
	 * This method clicks on a visible element using its Locator, with step tracking.
	 * @param locator - The Locator of the element to be clicked.
	 * @param elementName - The name of the element for logging purposes.
	 * @param timeout - Maximum time to wait for the element to be visible, in milliseconds. Default is 4000ms.
	 */
	async clickOnElement(
		locator: Locator,
		elementName: string,
		timeout: number = 4000
	): Promise<void> {
		await this.baseActions.clickOnElement(locator, elementName, timeout);
	}

	/**
	 * This method enters text into a visible element using its Locator, with step tracking.
	 * @param locator - The Locator of the input element.
	 * @param text - The text to enter in the input element.
	 * @param elementName - The name of the element for logging purposes.
	 * @param timeout - Maximum time to wait for the element to be visible, in milliseconds. Default is 4000ms.
	 */
	async enterTextInElement(
		locator: Locator,
		text: string,
		elementName: string,
		timeout: number = 4000
	): Promise<void> {
		await this.baseActions.enterTextInElement(
			locator,
			text,
			elementName,
			timeout
		);
	}

	/**
	 * This method selects an option from a visible dropdown element using its Locator, with step tracking.
	 * @param selector - The Locator of the dropdown element.
	 * @param option - The value attribute of the option to select.
	 * @param timeout - Maximum time to wait for the dropdown to be visible, in milliseconds. Default is 4000ms.
	 */
	async selectOptionFromDropdown(
		selector: Locator,
		option: string,
		timeout: number = 4000
	): Promise<void> {
		await this.baseActions.selectOptionFromDropdown(selector, option, timeout);
	}

	/**
	 * This method retrieves the trimmed text content of a visible element using its Locator, with step tracking.
	 * @param locator - The Locator of the element.
	 * @param timeout - Maximum time to wait for the element to be visible, in milliseconds. Default is 4000ms.
	 * @returns The trimmed text content of the element.
	 */
	async getElementText(
		locator: Locator,
		timeout: number = 4000
	): Promise<string> {
		return await this.baseActions.getElementText(locator, timeout);
	}
}
