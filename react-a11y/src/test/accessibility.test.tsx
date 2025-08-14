import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Theme } from "@radix-ui/themes";
import { AppThemeProvider } from "@/components/Theme/ThemeProvider";
import HomePage from "@/app/page";
import "jest";

expect.extend(toHaveNoViolations);

describe("HomePage accessibility", () => {
  it("has no detectable a11y violations", async () => {
    const { container } = render(
      <AppThemeProvider>
        <Theme appearance="dark" accentColor="violet" grayColor="slate">
          <HomePage />
        </Theme>
      </AppThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders heading and list", () => {
    render(
      <AppThemeProvider>
        <Theme appearance="dark" accentColor="violet" grayColor="slate">
          <HomePage />
        </Theme>
      </AppThemeProvider>
    );
    expect(
      screen.getByRole("heading", { name: /Fruits Gallery/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /Fruits/i })).toBeInTheDocument();
  });
});
