import { Option } from "@rbxts/rust-classes";
import { SystemDefinition } from "@rbxts/stitch";
import { Collision } from "shared/universe/shared/scripts/components/collision";
import { Damage } from "shared/universe/shared/scripts/components/damage";
import { Weapon } from "shared/universe/shared/scripts/components/weapon";
import { WeaponActivation } from "../components/weapon_activation";

const is_off_cooldown = (weapon: WeaponActivation) => {};

export = identity<MeleeWeaponSystem>({
	priority: 1,

	onCreate: (world) => {
		world.registerComponent(WeaponActivation);
	},

	onUpdate: (world) => {
		world
			.createQuery()
			.all<[WeaponActivation, Weapon]>("weapon_activation")
			.forEach((e, activated) => {
				if (os.clock() - activated.activation_time.expect("unexpected err") >= activated.duration) {
					world.removeComponent("hitboxcollider", e);
					world.removeComponent("weapon_activation", e);
				}
			});

		world
			.createQuery()
			.all<[Collision]>("collision")
			.forEach((e, { source, touched }) => {
				source.match((src) => {
					const weapon = world.getComponent<Weapon>("weapon", src);
					const activation = world.getComponent<WeaponActivation>("weapon_activation", src);

					if (weapon === undefined || activation === undefined) return;

					touched.match((hit) => {
						const touched_entity = hit.FindFirstAncestorWhichIsA("Model");

						if (touched_entity !== undefined) {
							const has_damaged = activation.damaged_entities.has(touched_entity);
							const is_owner = touched_entity === (src as Instance).Parent;
							if (has_damaged === false && !is_owner) {
								world.addComponent<Damage>(
									"damage",
									{},
									{
										source: Option.some((src as Instance).Parent as Model),
										target: Option.some(touched_entity),
										amount: Option.some(activation.damage),
										player: activation.player,
										id: activation.id,
									},
								);

								activation.damaged_entities.add(touched_entity);
							}
						}
					}, error);
				}, warn);
			});
	},
});

interface MeleeWeaponSystem extends SystemDefinition {}
