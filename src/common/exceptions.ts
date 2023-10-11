import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common'

export class IncompatiblePollItemType extends HttpException {
  constructor() {
    super('ERR_INCOMPATIBLE_POLL_ITEM_TYPE', HttpStatus.BAD_REQUEST)
    Object.setPrototypeOf(this, IncompatiblePollItemType.prototype)
  }
}

// istanbul ignore next - covered with repository tests
export class PollItemNotFound extends NotFoundException {
  constructor() {
    super('ERR_POLL_ITEM_NOT_FOUND')
    Object.setPrototypeOf(this, PollItemNotFound.prototype)
  }
}
