import { Option } from "@rbxts/rust-classes";
import { HttpService, UserInputService } from "@rbxts/services";
import { SystemDefinition } from "@rbxts/stitch";
import { Activation } from "shared/universe/shared/scripts/components/activation";
import { MouseActivatable } from "../components/mouse_activatable";

interface InputSystem extends SystemDefinition {}

export = identity<InputSystem>({
	priority: -10,

	onUpdate: (world) => {
		world
			.createQuery()
			.all<[MouseActivatable]>("mouse_activable")
			.forEach((entity, component) => {
				if (UserInputService.IsMouseButtonPressed(component.mouse_button)) {
					world.addComponent<Activation>("activation", entity, {
						target: Option.some(entity),
						id: Option.some(HttpService.GenerateGUID(false)),
					});
				}
			});
	},
});
