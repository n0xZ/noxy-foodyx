import type { InputHTMLAttributes } from 'react'
import { ReactNode } from 'react'

interface Field extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	type: string
	name: string
	errors?: string
}
export const FormField = ({ label, name, type, errors, ...rest }: Field) => {
	return (
		<aside className="w-full  space-y-0 flex flex-col justify-center space-y-1">
			<label className="font-bold label label-text">{label}</label>
			<input
				type={type}
				name={name}
				className="w-full  rounded-md border-2 border-orange-300 focus:outline-none focus:ring focus:border-orange-400 focus:ring-orange-500 "
				{...rest}
			/>
			<span className="text-red-500 h-9 " data-test="input-errors">
				{errors && errors}
			</span>
		</aside>
	)
}
