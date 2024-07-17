"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
const typeorm_1 = require("typeorm");
/**
 * 股票信息表
 */
let Stock = class Stock {
};
exports.Stock = Stock;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Stock.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({}),
    __metadata("design:type", String)
], Stock.prototype, "stock_code", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({}),
    __metadata("design:type", String)
], Stock.prototype, "stock_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "\u5E02\u76C8\u7387", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 4, }),
    __metadata("design:type", Number)
], Stock.prototype, "\u603B\u5E02\u503C", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 4, }),
    __metadata("design:type", Number)
], Stock.prototype, "\u6D41\u901A\u5E02\u503C", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "\u6362\u624B\u7387", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stock.prototype, "\u4EBA\u5747\u6D41\u901A\u80A1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stock.prototype, "\u80A1\u4E1C\u4EBA\u6570", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Stock.prototype, "\u4EBA\u5747\u6301\u4ED3\u91D1\u989D", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Stock.prototype, "\u5341\u5927\u80A1\u4E1C\u6301\u80A1\u5408\u8BA1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Stock.prototype, "\u5341\u5927\u6D41\u901A\u80A1\u4E1C\u6301\u80A1\u5408\u8BA1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Stock.prototype, "\u8F83\u4E0A\u671F\u53D8\u5316", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, }),
    __metadata("design:type", Date)
], Stock.prototype, "person_end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Stock.prototype, "person_update_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Stock.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Stock.prototype, "address_one", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Stock.prototype, "address_two", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stock.prototype, "flag", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({}),
    __metadata("design:type", Number)
], Stock.prototype, "used", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "price1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "price2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "price3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "price4", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "price5", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "price6", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "price7", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "price8", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "price9", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 10, scale: 2, }),
    __metadata("design:type", Number)
], Stock.prototype, "price10", void 0);
exports.Stock = Stock = __decorate([
    (0, typeorm_1.Entity)({ name: 't_stock' })
], Stock);
