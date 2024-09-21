import { Awaitable, Context, Schema, Service } from 'koishi'
import { } from "@quanhuzeyu/koishi-plugin-node"
import type obj_canvas from "canvas"
import type { } from "canvas"

export const inject = {
	required: ['node']
}

export const name = 'canvas'
export const usage = `
通过obj_canvas访问完整canvas功能
`

export interface Config {
	canvasVersion: string
}

export const Config: Schema<Config> = Schema.object({
	canvasVersion: Schema.string().default('2.11.2').description('canvas 版本')
})

declare module 'koishi' {
	interface Context {
		canvas: typeof obj_canvas
	}
}

export class QhzyCanvas extends Service {

	constructor(ctx: Context, config: Config) {
		super(ctx, 'canvas')
		this.config = {
			...config
		}
	}

	protected async start() {
		await this.ctx.node.safeImport<typeof obj_canvas>('canvas')
			.then(obj_canvas => {
				this.ctx.canvas = obj_canvas
			})
			.catch(e => {
				this.ctx.logger.info(`加载 canvas 失败: ${e}`)
			})
	}
}

export function apply(ctx: Context) {
	ctx.plugin(QhzyCanvas)
}
