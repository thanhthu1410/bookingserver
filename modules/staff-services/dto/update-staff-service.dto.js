"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStaffServiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_staff_service_dto_1 = require("./create-staff-service.dto");
class UpdateStaffServiceDto extends (0, mapped_types_1.PartialType)(create_staff_service_dto_1.CreateStaffServiceDto) {
}
exports.UpdateStaffServiceDto = UpdateStaffServiceDto;
//# sourceMappingURL=update-staff-service.dto.js.map