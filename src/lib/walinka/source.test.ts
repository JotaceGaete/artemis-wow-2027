import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getCatalogSource } from "./source";

const saved = process.env.ARTEMIS_DATA_SOURCE;

describe("getCatalogSource", () => {
  beforeEach(() => {
    delete process.env.ARTEMIS_DATA_SOURCE;
  });
  afterEach(() => {
    if (saved === undefined) delete process.env.ARTEMIS_DATA_SOURCE;
    else process.env.ARTEMIS_DATA_SOURCE = saved;
  });

  it("usa demo cuando la variable no está definida", () => {
    expect(getCatalogSource()).toBe("demo");
  });

  it("acepta walinka explícitamente", () => {
    process.env.ARTEMIS_DATA_SOURCE = "walinka";
    expect(getCatalogSource()).toBe("walinka");
  });

  it("falla ante un valor desconocido en lugar de recaer en demo", () => {
    process.env.ARTEMIS_DATA_SOURCE = "produccion";
    expect(() => getCatalogSource()).toThrow(/no válido/);
  });
});
