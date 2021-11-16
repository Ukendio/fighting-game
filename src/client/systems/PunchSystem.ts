import { Option, Result, Vec } from "@rbxts/rust-classes";
import damage from "shared/components/damage";
import { World } from "shared/Jade/world";

const punch_activation = {
	name: "weapon_activation",
	defaults: {
		damaged_entities: Option.none<Vec<BasePart>>(),
		duration: 0,
		damage: 0,
		enable: Option.none(),
	},
};

function query<T>(name: string): Vec<T> {
	return 1 as never;
}

const world = new World();
const a = world.spawn(1, true, {});
assert(world.get<number>(a).unwrap().deref() === 1);

export class PunchSystem {
	public on_update(): void {
		query<typeof damage>("damage")
			.iter()
			.filter((a) => a.defaults.source.isNone())
			.forEach((a) => {
				print(a);
			});
	}

	public get_component<T>(name: string): Option<Vec<T>> {
		return Option.some(Vec.vec<T>());
	}

	public query() {}
}
