
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const OTP = () => {
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyOTP, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user && user.name) {
      navigate('/');
    } else if (user && !user.name) {
      navigate('/profile-setup');
    }
  }, [user, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    // Auto-focus to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    if (pastedData.length <= 4) {
      const digits = pastedData.slice(0, 4).split('');
      const newOtpValues = [...otpValues];
      
      digits.forEach((digit, index) => {
        if (index < 4) {
          newOtpValues[index] = digit;
        }
      });
      
      setOtpValues(newOtpValues);
      
      // Focus the next empty input or the last one
      const nextEmptyIndex = newOtpValues.findIndex(val => !val);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[3]?.focus();
      }
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    try {
      setIsResending(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCountdown(30);
      toast({
        title: 'OTP Resent',
        description: 'A new OTP has been sent to your phone.',
      });
    } catch (error) {
      toast({
        title: 'Failed to Resend OTP',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOTP = async () => {
    const otp = otpValues.join('');
    
    if (otp.length !== 4) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a valid 4-digit OTP.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsVerifying(true);
      const success = await verifyOTP(otp);
      
      if (success) {
        toast({
          title: 'OTP Verified',
          description: 'Successfully verified your phone number.',
        });
        navigate('/profile-setup');
      }
    } catch (error) {
      toast({
        title: 'OTP Verification Failed',
        description: 'Please check your OTP and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-agri-green/5 to-agri-sky/5">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-agri-green/10 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-agri-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Verify Your Phone</h1>
          <p className="text-muted-foreground mt-2">
            We've sent a 4-digit code to your phone
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl mb-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium">
                Enter Verification Code
              </label>
              <div className="flex justify-between gap-2">
                {otpValues.map((value, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="h-14 w-14 text-center text-xl focus:ring-2 focus:border-agri-green ring-agri-green/20"
                  />
                ))}
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-muted-foreground">
                  Didn't receive code?
                </p>
                <button
                  type="button"
                  className={`text-xs ${
                    countdown > 0
                      ? 'text-muted-foreground cursor-not-allowed'
                      : 'text-agri-green hover:underline'
                  }`}
                  onClick={handleResendOTP}
                  disabled={countdown > 0 || isResending}
                >
                  {isResending
                    ? 'Resending...'
                    : countdown > 0
                    ? `Resend in ${countdown}s`
                    : 'Resend Code'}
                </button>
              </div>
            </div>
            
            <Button
              onClick={handleVerifyOTP}
              className="w-full h-12 bg-agri-green hover:bg-agri-green-dark text-white font-medium"
              disabled={otpValues.some((v) => !v) || isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => navigate('/login')}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Change Phone Number
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
