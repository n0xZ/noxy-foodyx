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
		<aside className="w-full max-w-xs space-y-0 form-control">
			<label className="font-bold label label-text">{label}</label>
			<input
				type={type}
				name={name}
				className="w-full max-w-xs input input-bordered "
				{...rest}
			/>
			<span className="text-red-500 h-9 " data-test="input-errors">
				{errors && errors}
			</span>
		</aside>
  )
}
