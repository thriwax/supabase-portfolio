import react from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
	react.configs.recommended,
	{
		plugins: { react: reactPlugin, 'jsx-a11y': jsxA11y },
		rules: {
			'react/jsx-uses-react': 'error',
			'react/jsx-uses-vars': 'error',
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off'
		}
	}
];