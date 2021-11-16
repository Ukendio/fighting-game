import { Option } from "@rbxts/rust-classes";
import { ComponentDefinition } from "@rbxts/stitch";

export interface Damage extends ComponentDefinition {
	defaults: {
		source: Option<Model>;
		target: Option<Model>;
		amount: Option<number>;
		player: Option<Player>;
		id: Option<string>;
	};
}

export const Damage = identity<Damage>({
	defaults: {
		source: Option.none(),
		target: Option.none(),
		amount: Option.none(),
		player: Option.none(),
		id: Option.none(),
	},
});
