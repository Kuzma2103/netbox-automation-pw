import { Locator, Page } from '@playwright/test';
import { BaseActions } from '../utils/BaseActions';

export class BasePage {
	readonly baseActions: BaseActions;

	constructor(readonly page: Page) {
		this.baseActions = new BaseActions(page);
	}

	/**
	 * This method wait for element for provided time and click on it, with step tracking
	 * @param locator - Locator of the element
	 * @param elementName - Name of the element for logging in report
	 * @param timeout - Wait for element to be visible. Default value is set to 4s
	 */
	async clickOnElement(
		locator: Locator,
		elementName: string,
		timeout: number = 4000
	): Promise<void> {
		await this.baseActions.clickOnElement(locator, elementName, timeout);
	}

	/**
	 * This method wait for element for provided time and fill the element with provided text, with step tracking
	 * @param locator - Locator of the element
	 * @param text - Text to enter in element
	 * @param elementName - Name of the element for logging in report
	 * @param timeout - Default timeout of 5s
	 */
	async enterTextInElement(
		locator: Locator,
		text: string,
		elementName: string,
		timeout: number = 5000
	): Promise<void> {
		await this.baseActions.enterTextInElement(
			locator,
			text,
			elementName,
			timeout
		);
	}

	/**
	 * This method choose option from dropdown, with step tracking
	 * @param selector - Selector of the dropdown element
	 * @param option - Option from dropdown element
	 */
	async selectOptionFromDropdown(
		selector: string,
		option: string
	): Promise<void> {
		await this.baseActions.selectOptionFromDropdown(selector, option);
	}

	/**
	 * This method return the text content of an element.
	 * @param locator - Locator of the element
	 * @returns - The text of the element
	 */
	async getElementText(locator: string): Promise<string> {
		return await this.baseActions.getElementText(locator);
	}
}
