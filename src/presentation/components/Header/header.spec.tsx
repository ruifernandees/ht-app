import * as React from 'react';
import {
	Button, Text, TextInput, View,
} from 'react-native';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Header} from '.';
import {Feather} from '@expo/vector-icons';
import '@testing-library/jest-dom';

describe('Header tests', () => {
	it('Should render correct text', async () => {
		const title = 'Hello World';
		render(<Header title={title} />);
		const titleNode = await screen.findByTestId('header-title');
		expect(titleNode.children[0]).toBe(title);
	});

	it('Should render correct icon and trigger events', async () => {
		const title = 'Hello World';
		let wasTriggered = false;
		render(
			<Header
				title={title}
				iconAtEnd={<Feather testID='icon-inside-header' onPress={() => {
					wasTriggered = true;
				}}/> }
			/>,
		);
		const iconNode = await screen.findByTestId('icon-inside-header');
		fireEvent.press(iconNode);
		expect(wasTriggered).toBeTruthy();
		await expect(async () => screen.findByTestId('icon1-inside-header')).rejects.toThrow();
	});
});

