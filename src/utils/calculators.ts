export const calculateEMI = (principal: number, rate: number, tenure: number) => {
  const r = rate / (12 * 100);
  const n = tenure;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;
  
  return {
    monthlyEmi: emi,
    totalInterest,
    totalPayment,
  };
};

export const calculateGST = (amount: number, rate: number, isInclusive: boolean) => {
  if (isInclusive) {
    const originalAmount = amount / (1 + rate / 100);
    const gstAmount = amount - originalAmount;
    return {
      originalAmount,
      gstAmount,
      totalAmount: amount,
    };
  } else {
    const gstAmount = (amount * rate) / 100;
    const totalAmount = amount + gstAmount;
    return {
      originalAmount: amount,
      gstAmount,
      totalAmount,
    };
  }
};

export const calculateBMI = (weight: number, heightCm: number) => {
  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  let category = '';
  
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  
  return { bmi, category };
};

export const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};
