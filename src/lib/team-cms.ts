import type { TeamCmsMember } from "@/lib/cms-types";
import { CMS_ICON_MAP } from "@/lib/cms-icons";
import type { Icon } from "@phosphor-icons/react";

export type DisplayTeamMember = TeamCmsMember & { icon: Icon };

export function toDisplayTeamMember(member: TeamCmsMember): DisplayTeamMember {
  return {
    ...member,
    icon: CMS_ICON_MAP[member.iconKey],
  };
}

export function getLeadershipBanner(members: TeamCmsMember[]) {
  return members.filter((m) => m.showInBanner).slice(0, 2);
}
