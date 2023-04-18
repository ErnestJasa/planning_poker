using PlanningPokerAPI.Data;
using PlanningPokerAPI.Dto;
using PlanningPokerAPI.Interfaces;
using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        
        public User Create(User user)
        {
           _context.Users.Add(user);
            user.Id = _context.SaveChanges();
            return user;
        }

        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User Login(UserDto dto)
        {
           var user = _context.Users.FirstOrDefault(x => x.Email == dto.Email && x.Password == dto.Password);
            return user;
        }
    }
}
