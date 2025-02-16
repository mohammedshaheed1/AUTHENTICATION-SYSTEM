import React from 'react';
import Button from '../custom/Button';
import { useDispatch, useSelector } from 'react-redux';
import { verifyemail } from '../store/authActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you're using this for toasts

const EmailVerify = () => {
  const inputRef = React.useRef(Array(6).fill(null)); // Initialize ref as an array
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.verification); // Assuming 'verification' holds the status

  // Handle input change to move to the next input
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  // Handle backspace to move to the previous input
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  // Submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otpArray = inputRef.current.map((input) => input.value);
    const otp = otpArray.join('');
    dispatch(verifyemail(otp));
  };

  // Handle successful email verification
  React.useEffect(() => {
    if (authStatus) {
      navigate('/');
      toast.info('Verified Email.');
    }
  }, [authStatus, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={onSubmitHandler} action="" className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Email Verify Otp</h1>
        <p className="text-center mb-6 text-indigo-300">Enter your 6-digit code sent to your email id</p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              ref={(e) => (inputRef.current[index] = e)} // Assign each input to the ref array
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              required
              className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
            />
          ))}
        </div>
        <Button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">Verify Email</Button>
      </form>
    </div>
  );
};

export default EmailVerify;
