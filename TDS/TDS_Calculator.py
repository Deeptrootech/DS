# New Regime:
# Net Annual Income(lakh)       Range	New Regime Tax Rate
#          0-3             	             Nil
#          3-6             	             5%
#          6-9             	             10%
#          9-12              	           15%
#          12-15             	           20%
#          >15                  	       30%

# Old Regime:
# Net Annual Income(lakh)       Range	New Regime Tax Rate
#          0-2.5           	             Nil
#          2.5-5             	           5%
#          5-10             	           20%
#          >10                  	       30%

def calculate_new_regime_tds(income):
  total_tds = 0
  if income >= 700000:
    if min((600000 - 300000),(income-300000))*0.05 > 0:
      total_tds += min((600000 - 300000),(income-300000))*0.05
    if min((900000 - 600000),(income-600000))*0.1 > 0:
      total_tds += min((900000 - 600000),(income-600000))*0.1
    if min((1200000 - 900000),(income-900000))*0.15 > 0:
      total_tds += min((1200000 - 900000),(income-900000))*0.15
    if min((1500000 - 1200000),(income-1200000))*0.2 > 0:
      total_tds += min((1500000 - 1200000),(income-1200000))*0.2
    if income > 1500000:
      total_tds += (income-1500000)*0.3
  return total_tds
def calculate_old_regime_tds(income, extra_deduction):
  income -= extra_deduction
  total_tds = 0
  if income >= 500000:
    if min((500000 - 250000),(income-250000))*0.05 > 0:
      total_tds += min((500000 - 250000),(income-250000))*0.05
    if min((1000000 - 500000),(income-500000))*0.2 > 0:
      total_tds += min((1000000 - 500000),(income-500000))*0.2
    if income > 1000000:
      total_tds += (income-1000000)*0.3
  return total_tds

annual_salary = int(input("Enter Annual Salary: ")) 
standard_deduction = 50000

extra_deduction = int(input("Enter an Extra deductions : "))


taxable_income = annual_salary - standard_deduction
total_new_regime_tax = 0
total_old_regime_tax = 0

new_regime_tds_amount = calculate_new_regime_tds(taxable_income)
old_regime_tds_amount = calculate_old_regime_tds(taxable_income, extra_deduction)
new_regime_cess_tax = new_regime_tds_amount * 0.04
old_regime_cess_tax = new_regime_tds_amount * 0.04

total_new_regime_tax = new_regime_tds_amount + new_regime_cess_tax
total_old_regime_tax = old_regime_tds_amount + old_regime_cess_tax

print(f"new regime annual Tax amount is: {total_new_regime_tax}")
print(f"old regime annual Tax amount is: {total_old_regime_tax}")
if total_old_regime_tax < total_new_regime_tax:
  print("Old Regime is better for you") 
elif total_old_regime_tax > total_new_regime_tax:
  print("New Regime is better for you") 
else:
  print("you can select any regime")