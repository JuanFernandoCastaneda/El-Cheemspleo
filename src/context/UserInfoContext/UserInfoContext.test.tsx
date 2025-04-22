import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import {
  UserObjectStatusProvider,
  useUserObject,
} from "./UserInfoContextLayout";
import { act, render, screen } from "@testing-library/react";
import { useSession } from "../AuthContext";
import { getUserInfo } from "../../db/user";

vi.mock("../AuthContext", () => ({
  useSession: vi.fn(),
}));

vi.mock("../../db/user", () => ({
  getUserInfo: vi.fn(),
}));

const DummyComponent: React.FC = () => {
  const userObject = useUserObject();
  return (
    <p>
      {userObject === "NoSession"
        ? "NoSession"
        : !userObject.userInfo
        ? "NoInfo"
        : userObject.userInfo.firstName}
    </p>
  );
};

describe("<UserInfoContext/> first render", () => {
  const mockUseSession = useSession as Mock;
  const mockGetUserInfo = getUserInfo as Mock;

  const renderDummyComponent = async () => {
    await act(async () => {
      render(
        <UserObjectStatusProvider>
          <DummyComponent />
        </UserObjectStatusProvider>
      );
    });
  };

  it("User has no info", async () => {
    mockUseSession.mockReturnValue({ user: { id: 1 } });
    mockGetUserInfo.mockResolvedValue(null);
    await renderDummyComponent();
    const result = screen.getByText("NoInfo");
    expect(result).toBeInTheDocument();
  });

  it("User is logged and has info", async () => {
    // Mock calls are used in all the rest of the its.
    mockUseSession.mockReturnValue({ user: { id: 1 } });
    mockGetUserInfo.mockResolvedValue({
      id: 1,
      firstName: "Juan",
      lastName: "Castaneda",
    });
    await renderDummyComponent();
    const result = screen.getByText("Juan");
    expect(result).toBeInTheDocument();
  });

  it("User isn't logged", async () => {
    mockUseSession.mockReturnValue(null);
    await renderDummyComponent();
    screen.debug();
    const result = screen.getByText("NoSession");
    expect(result).toBeInTheDocument();
  });
});
