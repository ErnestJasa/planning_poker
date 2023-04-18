using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Interfaces
{
    public interface IGuestUserRepository
    {

        GuestUser Create(GuestUser guestUser);
        bool Delete(string name);

        bool Save();
    }
}
