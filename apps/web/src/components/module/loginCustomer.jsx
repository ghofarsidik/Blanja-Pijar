import Textfield from '../base/textfield/textField';
import Button from '../base/button/button';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../configs/redux/action/auth.action';
import { useNavigate } from 'react-router-dom';
import Button2 from '../base/button/button2';

const loginCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)
    const [form, setForm] = useState({
        email: '',
        password: '',
        role: ''
    });
    
    const handleChange = (e) => {
       const { id, value } = e.target;
       setForm((prevForm) => ({
        ...prevForm,
        [id]: value
       }));
       console.log({ [id]: value });
    };

    const HandleRegister = () => {
      navigate('/register')
    }

    const handleLoginCustomer = () => {
      dispatch(loginAction(form.email, form.password, form.role, navigate));
      navigate('/')
    };

  return (
    <div>
        <div className='flex justify-center'>
          <Textfield 
              type="email"
              id="email"
              autocomplete="email"
              spellCheck={false}
              required
              placeholder="Email"
              className='w-96 h-12'
              value={form.email}
              onChange={handleChange}
          />
        </div>
        <div className='flex justify-center pb-5'>
          <Textfield 
              type="password"
              id="password"
              spellCheck={false}
              required
              placeholder="Password"
              className='w-96 h-12'
              value={form.password}
              onChange={handleChange}
          />
        </div>
        <div className='flex justify-center ml-64 text-red-maroon hover:font-semibold hover:text-red-500 cursor-pointer'>
        Forgot password?
        </div>
        <div className='flex justify-center py-5'>
          <Button
            name="Primary"
            onClick={handleLoginCustomer}
            className="flex justify-center "
          />
        </div>
        <div className='flex justify-center'>
        <p>Don&#39;t have a Tokopedia account?{' '}
        <span onClick={HandleRegister} className='text-red-maroon hover:font-semibold hover:text-red-500 cursor-pointer'>
            Register
        </span>
        </p>
        </div>
    </div>
    )
}

export default loginCustomer