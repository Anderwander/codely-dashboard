import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

export const renderWithRouter = (ui: ReactElement, { route = "/" } = {}) => {
	// la explicación de esta linea es que si no se le pasa un valor a route, por defecto será "/"
	window.history.pushState({}, "Test page", route); // esta linea es para simular que se navega a la ruta que se le pasa como parametro

	return {
		...render(ui, { wrapper: BrowserRouter }), // esta linea es para renderizar el componente que se le pasa como parametro
	};
};
