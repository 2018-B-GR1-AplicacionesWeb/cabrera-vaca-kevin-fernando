import {Controller} from "@nestjs/common";
import {RolService} from "./rol.service";

@Controller()
export class RolController {

    constructor(
        private readonly _rolService: RolService
    ) {
    }

}