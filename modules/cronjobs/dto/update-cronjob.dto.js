"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCronjobDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cronjob_dto_1 = require("./create-cronjob.dto");
class UpdateCronjobDto extends (0, mapped_types_1.PartialType)(create_cronjob_dto_1.CreateCronjobDto) {
}
exports.UpdateCronjobDto = UpdateCronjobDto;
//# sourceMappingURL=update-cronjob.dto.js.map