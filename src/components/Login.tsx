import { proxy } from '@/lib/proxy';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const Login = () => {
    const [iin, setIin] = useState<string>(''); 
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('')
    const router = useRouter()

    const handleIinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const iinValue = e.target.value;

        if (/^\d*$/.test(iinValue) && iinValue.length <= 12) {
            setIin(iinValue);
            setError(''); 
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        if (iin.length !== 12) {
            setError("Invalid IIN"); 
            return; 
        }

        try{
            const response = await proxy.post("/sms/login?city=akb",{login: iin, password})
            if (response.data.message !== "Вход выполнен. Сейчас Вы будете перенаправлены на главную страницу системы."){
                setError(response.data.message)
            }
            console.log("refreshing")
            window.location.reload()
            router.refresh()
        }catch(err: any){
            if (isAxiosError(err)){
                setError(err.message)
            }
            console.log(err)
            setError("Something went wrong. Try again later")
        }
        console.log('Submitted IIN:', iin);
        console.log('Submitted Password:', password);
    };

    return (
        <div className="bg-neutral-900 h-screen flex justify-center items-center">
            <div className="lg:w-1/5 w-4/5 shadow-lg rounded-lg p-8">
                <span className="text-5xl mr-2">🐧</span> 
                <p className="text-3xl font-semibold text-white mb-6 mt-2">eNIS akb</p>

                <div className="mb-4">
                    <input
                        type="text"
                        id="iin"
                        value={iin}
                        onChange={handleIinChange}
                        placeholder="ИИН"
                        className="w-full p-3 bg-neutral-800 text-white border-b-2 border-gray-600 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Пароль"
                        className="w-full p-3 bg-neutral-800 text-white border-b-2 border-gray-600 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    onClick={handleSubmit}
                    className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    Login
                </button>
            </div>
        </div>
    );
};
