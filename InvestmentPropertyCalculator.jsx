import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const InvestmentPropertyCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState('');
  const [downPaymentPercent, setDownPaymentPercent] = useState('20');
  const [interestRate, setInterestRate] = useState('6');
  const [amortizationYears, setAmortizationYears] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [annualExpenses, setAnnualExpenses] = useState('');
  const [results, setResults] = useState(null);

  const calculateInvestment = () => {
    // Mortgage calculation
    const P = propertyPrice * (1 - downPaymentPercent / 100);
    const r = (interestRate / 100) / 12;
    const n = amortizationYears * 12;
    const monthlyMortgagePayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    // NOI calculation
    const annualRent = monthlyRent * 12;
    const NOI = annualRent - annualExpenses;

    // Cap Rate calculation
    const capRate = (NOI / propertyPrice) * 100;

    // Cash on Cash Return calculation
    const downPayment = propertyPrice * (downPaymentPercent / 100);
    const annualMortgagePayment = monthlyMortgagePayment * 12;
    const annualCashFlow = NOI - annualMortgagePayment;
    const cashOnCashReturn = (annualCashFlow / downPayment) * 100;

    // Leverage calculation
    const unleveragedReturn = capRate;
    const leveragedReturn = cashOnCashReturn;
    let leverageType;
    if (leveragedReturn > unleveragedReturn) {
      leverageType = "Positive";
    } else if (leveragedReturn < unleveragedReturn) {
      leverageType = "Negative";
    } else {
      leverageType = "Neutral";
    }

    // Debt Service Coverage Ratio (DSCR) calculation
    const DSCR = NOI / annualMortgagePayment;

    // Gross Rent Multiplier (GRM) calculation
    const GRM = propertyPrice / annualRent;

    setResults({
      monthlyMortgagePayment: monthlyMortgagePayment.toFixed(2),
      NOI: NOI.toFixed(2),
      capRate: capRate.toFixed(2),
      cashOnCashReturn: cashOnCashReturn.toFixed(2),
      leverageType: leverageType,
      unleveragedReturn: unleveragedReturn.toFixed(2),
      leveragedReturn: leveragedReturn.toFixed(2),
      DSCR: DSCR.toFixed(2),
      GRM: GRM.toFixed(2)
    });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Comprehensive Investment Property Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="propertyPrice">Property Price ($)</Label>
            <Input
              id="propertyPrice"
              placeholder="Enter property price"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="downPayment">Down Payment (%)</Label>
            <Input
              id="downPayment"
              placeholder="20"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              placeholder="6"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="amortization">Amortization (years)</Label>
            <Input
              id="amortization"
              placeholder="Enter amortization period"
              value={amortizationYears}
              onChange={(e) => setAmortizationYears(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="monthlyRent">Monthly Rent ($)</Label>
            <Input
              id="monthlyRent"
              placeholder="Enter expected monthly rent"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="annualExpenses">Annual Expenses ($)</Label>
            <Input
              id="annualExpenses"
              placeholder="Enter annual expenses"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(e.target.value)}
            />
          </div>
          <Button onClick={calculateInvestment}>Calculate</Button>
          {results && (
            <div className="text-sm">
              <p><strong>Monthly Mortgage Payment:</strong> ${results.monthlyMortgagePayment}</p>
              <p><strong>Net Operating Income (NOI):</strong> ${results.NOI}</p>
              <p><strong>Cap Rate:</strong> {results.capRate}%</p>
              <p><strong>Cash on Cash Return:</strong> {results.cashOnCashReturn}%</p>
              <p><strong>Leverage Type:</strong> {results.leverageType}</p>
              <p><strong>Unleveraged Return:</strong> {results.unleveragedReturn}%</p>
              <p><strong>Leveraged Return:</strong> {results.leveragedReturn}%</p>
              <p><strong>Debt Service Coverage Ratio (DSCR):</strong> {results.DSCR}</p>
              <p><strong>Gross Rent Multiplier (GRM):</strong> {results.GRM}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentPropertyCalculator;
