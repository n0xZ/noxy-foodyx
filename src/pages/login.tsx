import type { FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import type { FirebaseError } from 'firebase/app'
import { z } from 'zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FormField } from '~/components/Form/FormField'
import { handleFirebaseErrors } from '~/utils/firebase-errors'
import { auth } from '~/lib/firebase'
import LoginLandingImg from '/login-img.svg'
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

	const {
		isLoading,
		mutate,
		data: user,
		isError,
		error,
		isSuccess,
	} = useMutation(SignInViaFirebase, {
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
	if (user) return <Navigate to="/home/general" replace={true} />
	return (
		<section className="h-screen  ">
			<article className="grid lg:grid-cols-2 xl:grid-cols-2 grid-cols-1 h-full place-items-center container mx-auto text-base">
				<aside className="text-center lg:text-left">
					<h1 className="text-2xl font-bold text-center">
						Encuentra las recetas que facilitarán tu día a día!
					</h1>
					<p className="py-6 text-center">
						Estás a nada de poder encontrar las recetas que te salvarán tus mediodías
						y noches en Foodyx!
					</p>
					<img
						src={LoginLandingImg}
						alt="Ilustración en login, que representa a una de las tantas recetas que se encuentran dentro de Foodyx."
						className="rounded-lg aspect-video  p-2"
					
					/>
				</aside>

				<form
					onSubmit={SignIn}
					ref={(e) => isSuccess && e?.reset()}
					method="post"
					className="flex flex-col justify-center space-y-2 lg:max-w-md max-w-lg container mx-auto p-2"
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
						className="px-8 py-4 bg-orange-400 font-bold text-light-50 rounded-lg "
						disabled={isLoading}
						name="submit-login"
					>
						{!isLoading ? 'Iniciar sesión' : 'Iniciando...'}
					</button>
					<Link to="/register" className="text-center">
						No tengo una cuenta
					</Link>
					<span className="text-red-500 h-9 ">
						{isError && handleFirebaseErrors(error.message)}
					</span>
				</form>
			</article>
		</section>
	)
}
