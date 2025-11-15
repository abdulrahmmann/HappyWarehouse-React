import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {InputText} from 'primereact/inputtext'
import {Password} from 'primereact/password'
import {useAuth} from '../../../contexts/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const {login} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await login(email, password)
            navigate('/welcome')
        } catch (err: any) {
            setError('Email or password is incorrect')
            console.error('Login failed:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="h-screen w-screen bg-auth-overlay overflow-hidden">
            <div className="relative h-full flex items-center justify-center">
                <div className="container mx-auto px-3 h-full flex items-center justify-center">
                    <div className="max-w-[500px] w-full bg-[#f4f7fa] p-4 md:p-6 rounded-lg shadow-lg">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-4">
                                <div
                                    className="rounded-[0.8rem] w-[55px] h-[55px] border border-primary/30 flex items-center justify-center">
                                    <div
                                        className="relative flex items-center justify-center w-[50px] rounded-[0.6rem] h-[50px] bg-gradient-to-b from-theme-1/90 to-theme-2/90 bg-white">
                                        <div className="w-[26px] h-[26px] relative -rotate-45">
                                            <div
                                                className="absolute w-[20%] left-0 inset-y-0 my-auto rounded-full opacity-50 bg-white h-[75%]"></div>
                                            <div
                                                className="absolute w-[20%] inset-0 m-auto bg-white h-[120%] rounded-full"></div>
                                            <div
                                                className="absolute w-[20%] right-0 inset-y-0 my-auto rounded-full opacity-50 bg-white h-[75%]"></div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-lg sm:text-xl font-semibold text-primary">Happy Warehouse</h2>
                            </div>
                        </div>

                        {/* Texts */}
                        <div className="text-center gradient-text mb-5">
                            <h1 className="font-bold text-lg mb-2">Welcome Back to Happy Warehouse</h1>
                            <p className="text-base font-medium">Sign in to your account</p>
                        </div>

                        {error && (
                            <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="block text-sm mb-1">Email</label>
                                <InputText
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-sm mb-1">Password</label>
                                <Password
                                    toggleMask
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your Password"
                                    className="w-full"
                                    inputClassName="w-full"
                                    feedback={false}
                                    required
                                />
                            </div>

                            <a href="#"
                               className="text-primary text-sm font-medium cursor-pointer underline block ml-auto w-fit">
                                Forgot Password
                            </a>

                            <button
                                type="submit"
                                className="btn-auth-submit"
                                disabled={loading || !email || !password}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                            <div className="text-sm font-normal mt-5 text-center text-gray-600">
                                Don't have any account?{' '}
                                <a href="#" className="text-primary font-medium cursor-pointer hover:underline">
                                    Register
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login

