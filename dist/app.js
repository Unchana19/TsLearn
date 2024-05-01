"use strict";
class Employee {
    constructor(name, department, salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }
    showDetail() {
        console.log(`name = ${this.name}, dept = ${this.department}, salary = ${this.salary}`);
    }
    set Salary(salary) {
        this.salary = salary;
    }
    get Salary() {
        return this.salary;
    }
}
class IT extends Employee {
    constructor(name, salary) {
        super(name, "IT", 50000);
        this.income = salary;
    }
    info() {
        console.log("devoloper");
    }
    reportIncome() {
        console.log(`income per year = ${this.income * 12}`);
    }
}
class Accounting extends Employee {
    constructor(name, salary) {
        super(name, "Accounting", 40000);
        this.income = salary;
    }
    info() {
        console.log("Accounter");
    }
    reportIncome() {
        console.log(`income per year = ${this.income * 12}`);
    }
}
const emp1 = new IT("oat", 50000);
const emp2 = new Accounting("mi", 40000);
emp1.reportIncome();
