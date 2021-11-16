import { Option } from "@rbxts/rust-classes";
import { ComponentDefinition } from "@rbxts/stitch";
import { Entity } from "@rbxts/stitch/out/World";

export interface Activation extends ComponentDefinition {
	defaults: {
		target: Option<Entity<never>>;
		id: Option<string>;
	};
}
export const Activation = identity<Activation>({
	defaults: {
		target: Option.none<Entity<never>>(),
		id: Option.none<string>(),
	},
});
