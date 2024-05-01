interface ReportIncome {
    income: number;
    reportIncome(): void
}

abstract class Employee {
    constructor(
        private name: string,
        private readonly department: string,
        private salary: number
    ) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    public showDetail() {
        console.log(`name = ${this.name}, dept = ${this.department}, salary = ${this.salary}`)
    }

    set Salary(salary: number) {
        this.salary = salary;
    }

    get Salary(): number {
        return this.salary;
    }

    abstract info(): void
}

class IT extends Employee implements ReportIncome {
    income: number;
    constructor(name: string, salary: number) {
        super(name, "IT", 50000);
        this.income = salary;
    }

    info(): void {
        console.log("devoloper");
    }

    reportIncome(): void {
        console.log(`income per year = ${this.income * 12}`);
    }
}

class Accounting extends Employee implements ReportIncome {
    income: number;
    constructor(name: string, salary: number) {
        super(name, "Accounting", 40000);
        this.income = salary;
    }

    info(): void {
        console.log("Accounter");
    }

    reportIncome(): void {
        console.log(`income per year = ${this.income * 12}`);
    }
}

const emp1 = new IT("oat", 50000);
const emp2 = new Accounting("mi", 40000);

emp1.reportIncome();