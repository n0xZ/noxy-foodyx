import type { FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import type { FirebaseError } from 'firebase/app'
import { z } from 'zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FormField } from '~/components/Form/FormField'
import { handleFirebaseErrors } from '~/utils/firebase-errors'
import { auth } from '~/lib/firebase'
import { useAppDispatch } from '~/redux/hooks'
import { setUser } from '~/redux/reducers/auth'
export const loginValidator = z.object({
	email: z
		.string()
		.min(5, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
})

type Fields = z.infer<typeof loginValidator>

const SignInViaFirebase = async ({ email, password }: Fields) => {
	const { user } = await signInWithEmailAndPassword(auth, email, password)

	return user
}
export default function Login() {
	const [errors, setErrors] = useState<z.ZodError<Fields> | null>(null)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const {
		isLoading,
		mutate,
		data: user,
		isError,
		error,
		isSuccess,
	} = useMutation(SignInViaFirebase, {
		async onSuccess() {
			return navigate('/home')
		},
		async onError(error: FirebaseError) {
			return error
		},
	})
	const SignIn = (e: FormEvent<HTMLFormElement>) => {
		const formData = new FormData(e.currentTarget)
		const inputEntries = Object.fromEntries(formData)
		const result = loginValidator.safeParse(inputEntries)
		if (result.success)
			mutate({ email: result.data.email, password: result.data.password })
		else setErrors(result.error)
		e.preventDefault()
	}
	if (user) return <Navigate to="/home" replace={true} />

	return (
		<section className="min-h-screen hero bg-base-200">
			<article className="flex-col hero-content lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-4xl font-bold text-center">
						Conéctate con tus amigos de várias partes del país!
					</h1>
					<p className="py-6 text-center">
						En Proyix, puedes crear tus salas de reuniones, donde puedes contactar con
						tus amigos de varias partes del país.
					</p>
				</div>

				<div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
					<form
						onSubmit={SignIn}
						ref={(e) => isSuccess && e?.reset()}
						method="post"
						className="grid card-body place-items-center"
					>
						<FormField
							label="Correo electrónico"
							name="email"
							type="email"
							errors={
								errors?.formErrors.fieldErrors.email &&
								errors?.formErrors.fieldErrors.email[0]
							}
							data-test="email-input"
						/>
						<FormField
							label="Contraseña"
							name="password"
							type="password"
							errors={
								errors?.formErrors.fieldErrors.email &&
								errors?.formErrors.fieldErrors.email[0]
							}
							data-test="password-input"
						/>

						<button
							type="submit"
							className="btn btn-primary "
							disabled={isLoading}
							name="submit-login"
						>
							{!isLoading ? 'Iniciar sesión' : 'Iniciando...'}
						</button>
						<Link to="/register">No tengo una cuenta</Link>
						<span className="text-red-500 h-9 ">
							{isError && handleFirebaseErrors(error.message)}
						</span>
					</form>
				</div>
			</article>
		</section>
	)
}
