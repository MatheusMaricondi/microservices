"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseAction = void 0;
const purchase_repository_1 = require("../repositories/purchase-repository");
const user_repository_1 = require("../repositories/user-repository");
const kafka_1 = __importDefault(require("../infra/messaging/kafka"));
class PurchaseAction {
    execute(purchaseRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield new user_repository_1.UserRepository().findUser(purchaseRequest.email);
            if (userId) {
                yield new purchase_repository_1.PurchaseRepository().create({
                    consumerId: userId.id,
                    productId: purchaseRequest.productId
                });
            }
            else {
                yield new user_repository_1.UserRepository().create({
                    email: purchaseRequest.email,
                    name: purchaseRequest.name
                });
            }
            const producer = kafka_1.default.producer();
            yield producer.connect();
            yield producer.send({
                topic: 'new-purchase',
                messages: [
                    { key: 'email', value: purchaseRequest.email },
                    { key: 'productId', value: purchaseRequest.productId }
                ],
            });
            yield producer.disconnect();
            return purchaseRequest;
        });
    }
}
exports.PurchaseAction = PurchaseAction;
