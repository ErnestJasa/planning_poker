using PlanningPokerAPI.Dto;
using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Interfaces
{
    public interface IUserRepository
    {

        User Create(User user);
        User GetByEmail(string email);
        User GetById(int id);
        User Login(UserDto dto);
    }
}
