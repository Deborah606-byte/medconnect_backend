"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
function catchAsync(handler) {
    return (req, res, next) => {
        handler(req, res, next).catch(next);
    };
}
exports.catchAsync = catchAsync;
