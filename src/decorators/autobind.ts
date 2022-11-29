namespace App {
    //autobind decorator
	export function AutoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;
		const adjDescriptor: PropertyDescriptor = {
			configurable: true,
	
			//get function below to modify .value method, so the .value method is automatically binded
			get() {
				const boundFn = originalMethod.bind(this);
				return boundFn;
			},
		};
		return adjDescriptor;
	};
};