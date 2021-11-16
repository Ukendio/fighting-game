import { Option } from "@rbxts/rust-classes";
import { ComponentDefinition } from "@rbxts/stitch";
import { Entity } from "@rbxts/stitch/out/World";

export interface WeaponActivation extends ComponentDefinition {
	name: "weapon_activation";
	defaults: {
		damaged_entities: Set<Model>;
		duration: number;
		hit_sound: Option<Sound>;
		damage: number;
		activation_time: Option<number>;
		enable: Array<Trail>;
		player: Option<Player>;
		id: Option<string>;
	};
	destructor?: (a: Entity<[this]>, data: this["defaults"]) => void;
}

export const WeaponActivation = identity<WeaponActivation>({
	name: "weapon_activation",
	defaults: {
		damaged_entities: new Set(),
		duration: 0,
		hit_sound: Option.none(),
		damage: 0,
		activation_time: Option.none(),
		enable: [],
		player: Option.none(),
		id: Option.none(),
	},
	destructor: (entity, data) => {
		data.enable.forEach((v) => {
			v.Enabled = false;
		});
	},
});
