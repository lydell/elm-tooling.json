import * as fs from "fs";
import * as path from "path";

import elmToolingCli from "../index";
import {
  clean,
  CursorWriteStream,
  MemoryWriteStream,
  RawReadStream,
  stringSnapshotSerializer,
} from "./helpers";

const FIXTURES_DIR = path.join(__dirname, "fixtures", "tools");

async function toolsHelper(
  fixture: string,
  chars: Array<string>
): Promise<{ stdout: string; json: string }> {
  const dir = path.join(FIXTURES_DIR, fixture);
  const elmToolingJsonPath = path.join(dir, "elm-tooling.json");
  const original = fs.readFileSync(elmToolingJsonPath, "utf8");

  const stdout = new CursorWriteStream();
  const stderr = new MemoryWriteStream();

  const exitCode = await elmToolingCli(["tools"], {
    cwd: dir,
    env: { ELM_HOME: dir },
    stdin: new RawReadStream(chars),
    stdout,
    stderr,
  });

  const json = fs.readFileSync(elmToolingJsonPath, "utf8");

  if (json !== original) {
    fs.writeFileSync(elmToolingJsonPath, original);
  }

  expect(stderr.content).toBe("");
  expect(exitCode).toBe(0);

  return {
    stdout: clean(stdout.getOutput()),
    json,
  };
}

expect.addSnapshotSerializer(stringSnapshotSerializer);

describe("tools", () => {
  test("default cursor position when no tools", async () => {
    const { stdout, json } = await toolsHelper("empty-elm-tooling", [
      "test-exit",
    ]);

    expect(stdout).toMatchInlineSnapshot(`
      ⧙/Users/you/project/fixtures/tools/empty-elm-tooling/elm-tooling.json⧘

      ⧙elm⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.0⧘
        ⧙[⧘▊⧙]⧘ ⧙0.19.1⧘

      ⧙elm-format⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.1⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.2⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.3⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.4⧘

      ⧙elm-json⧘
        ⧙[⧘ ⧙]⧘ ⧙0.2.8⧘

      ⧙Up⧘/⧙Down⧘ to move
      ⧙Space⧘ to toggle
      ⧙Enter⧘ to save
    `);

    expect(json).toMatchInlineSnapshot(`
      {}

    `);
  });

  test("default cursor position when tools are provided", async () => {
    const { stdout, json } = await toolsHelper("some-elm-tooling", [
      "test-exit",
    ]);

    expect(stdout).toMatchInlineSnapshot(`
      ⧙/Users/you/project/fixtures/tools/some-elm-tooling/elm-tooling.json⧘

      ⧙elm⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.0⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.1⧘

      ⧙elm-format⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.1⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.2⧘
        ⧙[⧘⧙☒⧘⧙]⧘ 0.8.3
        ⧙[⧘ ⧙]⧘ ⧙0.8.4⧘

      ⧙elm-json⧘
        ⧙[⧘⧙x⧘⧙]⧘ 0.2.8

      ⧙Up⧘/⧙Down⧘ to move
      ⧙Space⧘ to toggle
      ⧙Enter⧘ to save
    `);

    expect(json).toMatchInlineSnapshot(`
      {
        "tools": {
          "elm-json": "0.2.8",
          "elm-format": "0.8.3"
        }
      }

    `);
  });

  test("move cursor up past the edge", async () => {
    const { stdout, json } = await toolsHelper("empty-elm-tooling", [
      ...Array.from({ length: 100 }, () => "k"),
      "test-exit",
    ]);

    expect(stdout).toMatchInlineSnapshot(`
      ⧙/Users/you/project/fixtures/tools/empty-elm-tooling/elm-tooling.json⧘

      ⧙elm⧘
        ⧙[⧘▊⧙]⧘ ⧙0.19.0⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.1⧘

      ⧙elm-format⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.1⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.2⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.3⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.4⧘

      ⧙elm-json⧘
        ⧙[⧘ ⧙]⧘ ⧙0.2.8⧘

      ⧙Up⧘/⧙Down⧘ to move
      ⧙Space⧘ to toggle
      ⧙Enter⧘ to save
    `);

    expect(json).toMatchInlineSnapshot(`
      {}

    `);
  });

  test("move cursor down past the edge", async () => {
    const { stdout, json } = await toolsHelper("empty-elm-tooling", [
      ...Array.from({ length: 100 }, () => "j"),
      "test-exit",
    ]);

    expect(stdout).toMatchInlineSnapshot(`
      ⧙/Users/you/project/fixtures/tools/empty-elm-tooling/elm-tooling.json⧘

      ⧙elm⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.0⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.1⧘

      ⧙elm-format⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.1⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.2⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.3⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.4⧘

      ⧙elm-json⧘
        ⧙[⧘▊⧙]⧘ ⧙0.2.8⧘

      ⧙Up⧘/⧙Down⧘ to move
      ⧙Space⧘ to toggle
      ⧙Enter⧘ to save
    `);

    expect(json).toMatchInlineSnapshot(`
      {}

    `);
  });

  test("moves cursor to the end on exit", async () => {
    const fixture = "empty-elm-tooling";
    const { stdout, json } = await toolsHelper(fixture, ["q"]);

    expect(stdout).toMatchInlineSnapshot(`
      ⧙/Users/you/project/fixtures/tools/empty-elm-tooling/elm-tooling.json⧘

      ⧙elm⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.0⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.1⧘

      ⧙elm-format⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.1⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.2⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.3⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.4⧘

      ⧙elm-json⧘
        ⧙[⧘ ⧙]⧘ ⧙0.2.8⧘

      ⧙Up⧘/⧙Down⧘ to move
      ⧙Space⧘ to toggle
      ⧙Enter⧘ to save

      Nothing changed.
      ▊
    `);

    expect(json).toMatchInlineSnapshot(`
      {}

    `);

    expect(await toolsHelper(fixture, ["\x03"])).toEqual({ stdout, json });
  });

  test("moves cursor to the end on unchanged save", async () => {
    const fixture = "some-elm-tooling";
    const { stdout, json } = await toolsHelper(fixture, ["x", "x", "\r"]);

    expect(stdout).toMatchInlineSnapshot(`
      ⧙/Users/you/project/fixtures/tools/some-elm-tooling/elm-tooling.json⧘

      ⧙elm⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.0⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.1⧘

      ⧙elm-format⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.1⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.2⧘
        ⧙[⧘⧙x⧘⧙]⧘ 0.8.3
        ⧙[⧘ ⧙]⧘ ⧙0.8.4⧘

      ⧙elm-json⧘
        ⧙[⧘⧙x⧘⧙]⧘ 0.2.8

      ⧙Up⧘/⧙Down⧘ to move
      ⧙Space⧘ to toggle
      ⧙Enter⧘ to save

      Nothing changed.
      ▊
    `);

    // Should be unchanged.
    expect(json).toMatchInlineSnapshot(`
      {
        "tools": {
          "elm-json": "0.2.8",
          "elm-format": "0.8.3"
        }
      }

    `);
  });

  test("toggle then exit", async () => {
    const fixture = "some-elm-tooling";
    const { stdout, json } = await toolsHelper(fixture, ["x", "q"]);

    expect(stdout).toMatchInlineSnapshot(`
      ⧙/Users/you/project/fixtures/tools/some-elm-tooling/elm-tooling.json⧘

      ⧙elm⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.0⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.1⧘

      ⧙elm-format⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.1⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.2⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.3⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.4⧘

      ⧙elm-json⧘
        ⧙[⧘⧙x⧘⧙]⧘ 0.2.8

      ⧙Up⧘/⧙Down⧘ to move
      ⧙Space⧘ to toggle
      ⧙Enter⧘ to save

      Nothing changed.
      ▊
    `);

    // Should be unchanged.
    expect(json).toMatchInlineSnapshot(`
      {
        "tools": {
          "elm-json": "0.2.8",
          "elm-format": "0.8.3"
        }
      }

    `);
  });

  test("change elm version", async () => {
    const { stdout, json } = await toolsHelper("change-elm-version", [
      "k",
      " ",
      "\r",
    ]);

    expect(stdout).toMatchInlineSnapshot(`
      ⧙/Users/you/project/fixtures/tools/change-elm-version/elm-tooling.json⧘

      ⧙elm⧘
        ⧙[⧘⧙x⧘⧙]⧘ 0.19.0
        ⧙[⧘ ⧙]⧘ ⧙0.19.1⧘

      ⧙elm-format⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.1⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.2⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.3⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.4⧘

      ⧙elm-json⧘
        ⧙[⧘ ⧙]⧘ ⧙0.2.8⧘

      ⧙Up⧘/⧙Down⧘ to move
      ⧙Space⧘ to toggle
      ⧙Enter⧘ to save

      Saved! To install: elm-tooling install
      ▊
    `);

    // Other fields are preserved and the order is unchanged.
    expect(json).toMatchInlineSnapshot(`
      {
          "before": 1,
          "tools": {
              "elm": "0.19.0"
          },
          "after": 2
      }

    `);
  });

  test("removing last tool removes the entire field", async () => {
    const { stdout, json } = await toolsHelper("remove-last-tool", ["o", "\r"]);

    expect(stdout).toMatchInlineSnapshot(`
      ⧙/Users/you/project/fixtures/tools/remove-last-tool/elm-tooling.json⧘

      ⧙elm⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.0⧘
        ⧙[⧘ ⧙]⧘ ⧙0.19.1⧘

      ⧙elm-format⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.1⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.2⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.3⧘
        ⧙[⧘ ⧙]⧘ ⧙0.8.4⧘

      ⧙elm-json⧘
        ⧙[⧘ ⧙]⧘ ⧙0.2.8⧘

      ⧙Up⧘/⧙Down⧘ to move
      ⧙Space⧘ to toggle
      ⧙Enter⧘ to save

      Saved!
      ▊
    `);

    expect(json).toMatchInlineSnapshot(`
      {
          "entrypoints": [
              "./src/Main.elm"
          ]
      }

    `);
  });
});
