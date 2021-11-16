import { Option } from "@rbxts/rust-classes";
import { ComponentDefinition } from "@rbxts/stitch";
import { Entity } from "@rbxts/stitch/out/World";
import { WeaponActivation } from "shared/universe/client/scripts/components/weapon_activation";
import { Weapon } from "./weapon";

export interface Collision extends ComponentDefinition {
	defaults: {
		source: Option<Entity<[Weapon, WeaponActivation]>>;
		touched: Option<Instance>;
	};
}
