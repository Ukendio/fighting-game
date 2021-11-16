import { ComponentDefinition } from "@rbxts/stitch";

export interface Weapon extends ComponentDefinition {
	defaults: {
		last_activation: number;
		current_attack: number;
		cooldown: number;
	};
	tag: true;
	replicate: true;
}

export const Weapon = identity<ComponentDefinition>({
	defaults: {
		last_activation: 0,
		current_attack: 1,
		cooldown: 0,
	},
	tag: true,
	replicate: true,
});
