import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			transitionTimingFunction: {
				'custom-ease': 'cubic-bezier(0.65, 0.05, 0.36, 1)',
			  },
			fontFamily: {
				zentry: ['Zentry', 'sans-serif'],
				general: ['General', 'sans-serif'],
				'circular-web': ['circular-web', 'sans-serif'],
				'robert-regular': ['robert-regular', 'sans-serif'],
				'robert-medium': ['robert-medium', 'sans-serif'],
			},
			colors: {
				blue: {
					50: '#DFDFF0',
					75: '#DFDFF2',
					100: '#F0F2FA',
					200: '#010101',
					300: '#4FB7DD',
				},
				violet: {
					300: '#5724FF',
				},
				yellow: {
					100: '#8E983F',
					200: '#EDFF66',
				},
			},

		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
