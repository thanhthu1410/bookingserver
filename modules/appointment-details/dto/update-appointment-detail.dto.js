"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppointmentDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_appointment_detail_dto_1 = require("./create-appointment-detail.dto");
class UpdateAppointmentDetailDto extends (0, mapped_types_1.PartialType)(create_appointment_detail_dto_1.CreateAppointmentDetailDto) {
}
exports.UpdateAppointmentDetailDto = UpdateAppointmentDetailDto;
//# sourceMappingURL=update-appointment-detail.dto.js.map